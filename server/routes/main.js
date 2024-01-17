const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

// Function to execute a query and return a promise
function queryPromise(sqlQuery, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

router.get("/sections", async (req, res) => {
  const sqlQuery = "SELECT step_id,section, title FROM main_details";

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const formattedResults = {};
    results.forEach((row) => {
      const section = row.section;
      if (!formattedResults[section]) {
        formattedResults[section] = [];
      }
      formattedResults[section].push({ id: row.step_id, title: row.title });
    });

    res.status(200).json(formattedResults);
  });
});

router.get("/section-details", async (req, res) => {
  const { section } = req.query;

  const sqlQuery_md = 'SELECT * FROM main_details WHERE section = ?';
  const sqlQuery_sd = 'SELECT * FROM descriptions';
  const sqlQuery_pfs = 'SELECT * FROM parts_for_step';

  try {
    const [mainDetails, summaryDescription, partsForStep] = await Promise.all([
      queryPromise(sqlQuery_md, [section]),
      queryPromise(sqlQuery_sd),
      queryPromise(sqlQuery_pfs),
    ]);

    mainDetails.forEach((detail) => {
      let descriptions = []
      let parts = []

      summaryDescription.forEach((description) => {
        if ((description.step_id) == (detail.step_id)){
          descriptions.push(description.description)
        }
      })

      partsForStep.forEach((part) => {
        if ((part.step_id) == (detail.step_id)){
          parts.push({"part_id":part.part_id,"part_image":part.part_link})
        }
      })

      detail.descriptions = descriptions;
      detail.parts = parts;
    })

    res.status(200).json({
      mainDetails
    });

  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
