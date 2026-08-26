const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    pokemonId: {
      type: Number,
      required: true,
    },

    pokemonName: {
      type: String,
      required: true,
    },

    sprite: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same user from favoriting
// the same Pokemon more than once.
favoriteSchema.index(
  { user: 1, pokemonId: 1 },
  { unique: true }
);

module.exports = mongoose.model('favorite', favoriteSchema);