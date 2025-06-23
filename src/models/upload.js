// models/Upload.js
import { DataTypes } from '@sequelize/core';
import { sequelize } from '../config/db.js';

export const Upload = sequelize.define('Upload', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  stored_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});
