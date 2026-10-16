const mongoose = require("mongoose");
const Registration = require("../models/Registration");

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/registrations
exports.createRegistration = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;
    const data = await Registration.create({ fullName, email, phone });
    res.status(201).json({ success: true, message: "Registration successful", data });
  } catch (err) {
    next(err);
  }
};

// GET /api/registrations
exports.getRegistrations = async (req, res, next) => {
  try {
    const data = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/registrations/:id
exports.getRegistration = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid ID" });
    const data = await Registration.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Registration not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/registrations/:id
exports.updateRegistration = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid ID" });
    const { fullName, email, phone } = req.body;
    const data = await Registration.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phone },
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Registration not found" });
    res.status(200).json({ success: true, message: "Registration updated", data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/registrations/:id
exports.deleteRegistration = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid ID" });
    const data = await Registration.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Registration not found" });
    res.status(200).json({ success: true, message: "Registration deleted" });
  } catch (err) {
    next(err);
  }
};
