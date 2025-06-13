import Pharmacy from '../models/PharmacyModel.js';

export const findNearbyPharmacies = async (req, res) => {
  const { lat, lng, medicine, maxDistance = 5, deliveryOnly = false } = req.query;

  if (!lat || !lng || !medicine) {
    return res.status(400).json({ message: 'Missing required query parameters' });
  }

  try {
    const pharmacies = await Pharmacy.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: maxDistance * 1000 // meters
        }
      },
      ...(deliveryOnly && { hasDelivery: true }),
      inventory: {
        $elemMatch: {
          medicineName: { $regex: new RegExp(`^${medicine}$`, 'i') },
          stock: { $gt: 0 }
        }
      }
    });

    const result = pharmacies.map((pharmacy) => {
      const matchedMed = pharmacy.inventory.find(
        (m) => m.medicineName.toLowerCase() === medicine.toLowerCase()
      );

      return {
        name: pharmacy.name,
        address: pharmacy.address,
        hasDelivery: pharmacy.hasDelivery,
        price: matchedMed?.price,
        stock: matchedMed?.stock,
        eta: pharmacy.hasDelivery ? '30 mins' : 'Pickup only'
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addInventoryItem = async (req, res) => {
  const { pharmacyId, medicineName, stock, price, expiryDate } = req.body;

  try {
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    // Check if medicine already exists in inventory
    const existingItem = pharmacy.inventory.find(
      (item) => item.medicineName.toLowerCase() === medicineName.toLowerCase()
    );

    if (existingItem) {
      // Update existing stock and price
      existingItem.stock += stock;
      existingItem.price = price; // or apply average pricing logic
      existingItem.expiryDate = expiryDate;
    } else {
      // Add new medicine
      pharmacy.inventory.push({ medicineName, stock, price, expiryDate });
    }

    await pharmacy.save();
    res.status(200).json({ message: 'Inventory updated', inventory: pharmacy.inventory });
  } catch (error) {
    console.error('Add inventory error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPharmacy = async (req, res) => {
  const { name, address, lat, lng, hasDelivery } = req.body;

  try {
    const existing = await Pharmacy.findOne({ name, address });
    if (existing) {
      return res.status(400).json({ message: 'Pharmacy already exists' });
    }

    const pharmacy = await Pharmacy.create({
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      hasDelivery,
    });

    res.status(201).json({ message: 'Pharmacy created', pharmacy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating pharmacy' });
  }
};
