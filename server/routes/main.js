const express = require('express');
const connection =  require('../connection');
const router =  express.Router();

require('dotenv').config();

router.get('/sections', async (req, res) => {
    const sqlQuery = 'SELECT section, title FROM main_details';
  
    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const resultObject = {};
  
      results.forEach((row) => {
        const section = row.section;
        const title = row.title;
  
        if (!resultObject[section]) {
          resultObject[section] = [title];
        } else {
          resultObject[section].push(title);
        }
      });
  
      console.log(resultObject);
  
      res.status(200).json(resultObject);
    });
  });

router.get('/section-details/:id', async(req,res) => {
    const section_id = req.params.id;
})