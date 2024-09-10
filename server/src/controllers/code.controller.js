import { request, response } from 'express';
import Code from '../models/Code.js';
import logger from '../config/logger.js';

export const getCodeById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const code = await Code.findOne({ id });
    // console.log(id);

    if (!code) {
      return res.status(404).json({ msg: 'Code not found, invalid id' });
    }

    return res.json({
      code,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createCode = async (req = request, res = response) => {
  const { id, language, code } = req.body;

  try {
    let newCode = await Code.findOne({ id });

    if (newCode) {
      return res.status(400).json({
        msg: 'ID already exists',
      });
    }

    newCode = new Code({
      id,
      language,
      code,
    });

    await newCode.save();

    return res.status(201).json({
      newCode,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      msg: 'Error',
      error: error.message,
    });
  }
};
