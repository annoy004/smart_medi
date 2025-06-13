import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  expiryDate: { type: Date, required: true }
});

const pharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [lng, lat]
  },
  hasDelivery: { type: Boolean, default: false },
  inventory: [inventorySchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Pharmacy owner
});

pharmacySchema.index({ location: '2dsphere' });

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
export default Pharmacy;
