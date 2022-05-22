const express = require('express')
const cors = require('cors')
const fs = require('fs')

const { PORT, PASSWORD } = require('./config.js')
const detailsFile = fs.readFileSync('details.json')
const studentData = JSON.parse(detailsFile)

//! Helper Functions -----------------------------
const writeToFile = (_data) => {
    fs.writeFile('details.json', JSON.stringify(_data), () => {
        console.log("Database updated successfully!")
    })
}

//! Configuring App ------------------------------
const app = express()
app.use(cors())
app.use(express.json({
    limit: '30mb',
    extended: true
}))
app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))

//! Routes ---------------------------------------
app.get('/', async (req, res) => {
    res.send("Hello World").status(200)
})

app.post('/password', async (req, res) => {
    const pswd = req.body.password
    if (pswd === PASSWORD)
        res.json({
            status: 200,
            data: studentData
        })
    else
        res.json({
            status: 403
        })
})

app.post('/student', async (req, res) => {
    studentData.push(req.body)
    writeToFile(studentData)
    res.json("Uff")
})

app.post("/logout", async (req, res) => {
    let idx = -1;
    for (let i=0; i<studentData.length; i++){
        if (studentData[i].hour === req.body.hour)
            if (studentData[i].date === req.body.date)
                if (studentData[i].name === req.body.name){
                    idx = i;
                    break
                }
    }
    if (idx > -1){
        studentData.splice(idx, 1)
        writeToFile(studentData)
        return res.json({ status: 200 })
    } else {
        return res.json({ status: 404 })
    }
})

app.listen(PORT, () => {
    console.log(`[node] Listening on port #${PORT}..\n`)
})