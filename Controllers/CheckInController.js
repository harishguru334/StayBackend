const CheckIn = require('../Mdule/Checkinmodel');

exports.createCheckIn = async (req, res) => {
  try {
    const { form, posting, isGST, gstNumber } = req.body;

    // Handle photos
    const guestPhotos = req.files?.guestPhotos ? req.files.guestPhotos.map(file => file.path) : [];
    const extraPersons = req.files?.extraPersons ? req.files.extraPersons.map(file => file.path) : [];

    // Calculate Posting Summary
    const base = Number(posting.baseTariff || 0);
    const extra = Number(posting.extraPersonCharge || 0) * Number(posting.extraPersonCount || 0);
    const other = Number(posting.otherCharges || 0);
    const discount = Number(posting.discount || 0);
    const subtotal = base + extra + other - discount;
    const gstRate = isGST ? 0.18 : 0;
    const gstAmount = subtotal * gstRate;
    const total = subtotal + gstAmount;

    // Create Single CheckIn Document
    const checkIn = new CheckIn({
      ...form,  // Guest details
      guestPhotos,
      extraPersons,
      isGST,
      gstNumber,
      ...posting,  // Posting details
      subtotal,
      gstAmount,
      total,
    });
    await checkIn.save();

    res.status(201).json({ message: 'Check-In saved successfully', checkInId: checkIn._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCheckIn = async (req, res) => {
  try {
    const checkIn = await CheckIn.findById(req.params.id);
    if (!checkIn) return res.status(404).json({ error: 'Check-In not found' });
    res.json(checkIn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};