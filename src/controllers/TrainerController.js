const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const { response } = require('express')
const prisma = new PrismaClient()

module.exports = {
  async removePokemon(req, res) {
    const { trainer_id, pokemon_removed } = req.body

    const team_battle = prisma.team.update({
      where: {
        id: trainer_id
      },
      data: {
        pokemonsId: {
          push: pokemon_removed
        }
      }
    })

    return res.json(team_battle)
  },

  async insertPokemon(req, res) {
    const { trainer_id, new_pokemon } = req.body

    const team_battle = prisma.team.update({
      where: {
        id: trainer_id
      },
      data: {
        pokemonsId: {
          push: new_pokemon
        }
      }
    })

    return res.json(team_battle)
  },

  async transferCoins(req, res) {
    const { receiver, coins, payer  } = req.body

    const deposit_coins = prisma.profile.update({
      where: {
        id: receiver
      },
      data: {
        coins: {
          increment: coins
        }
      }
    })

    const debit_coins = prisma.profile.update({
      where: {
        id: payer
      },
      data: {
        coins: {
          decrement: coins
        }
      }
    })

    const transfer = await prisma.create({
      data: {
        origin: receiver,
        coins: coins,
        trainerId: payer
      }
    })

    return res.json(transfer)
  },

  async createProfile(req, res) {
    const { username, password, email, pokemon, pokemon_sprite, item, item_sprite, item2, item_sprite2 } = req.body

    const profile = await prisma.profile.create({
      data: {
        username: username,
        password: password,
        email: email,
      }
    })

    const starter_pokemon = await prisma.captured.create({
      data: {
        pokemon: pokemon,
        attacks: ["Tackle", "Thunder Shock"],
        sprite: pokemon_sprite,
        trainer: { connect: { id: profile.id }},
      },
    })

    const team_battle = await prisma.team.create({
      data: {
        trainer: { connect: { id: profile.id } },
        pokemonsId: [starter_pokemon.id],
      },
    })

    const start_items = await prisma.item.create({
      data: {
        item: item,
        sprite: item_sprite,
        amount: 5,
        trainer: { connect: { id: profile.id }},
      },
      data: {
        item: item2,
        sprite: item_sprite2,
        amount: 5,
        trainer: { connect: { id: profile.id }},
      },
    })

    const data = {
      profile: profile,
      starterPokemon: starter_pokemon,
      startItems: start_items,
      teamBattle: team_battle
    }

    return res.json(data)
  }
}