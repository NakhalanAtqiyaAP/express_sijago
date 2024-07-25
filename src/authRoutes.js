// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/database');

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js';
const router = express.Router();

//tokennya
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
//cek ada data yang belum di isi
    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }
//membuat data baru user
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserQuery = 'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const newUser = await pool.query(newUserQuery, [username, email, hashedPassword, role]);

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error('Error creating user', error.stack);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
//cek username dan pw 
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
//mengambil data username
    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await pool.query(userQuery, [username]);
        const user = userResult.rows[0];
//jika ada username dan passwordnya benar maka akan dibuatkan token yang berlaku 4 jam
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '4h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user', error.stack);
        res.status(500).send('Server error');
    }
});

export default router;
