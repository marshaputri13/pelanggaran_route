const express = require ("express")
const router = express.Router()
const db = require("./db")
const multer = require("multer")
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})

// PELANGGARAN
// end-point menyimpan data pelanggaran
router.post("/pelanggaran", upload.single("foto_pelanggaran"), (req, res) => {
    // prepare data
    let data = {
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin,
        foto_pelanggaran: req.file.filename
    }

    if (!req.file) {
        // jika tidak ada file yang diupload
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        // create sql insert
        let sql = "insert into pelanggaran set ?"

        // run query
        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})

router.get("/pelanggaran", (req,res) => {
    let sql = "select * from pelanggaran"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

router.get("/pelanggaran/:id", (req,res) => {
    let data = {
        id_pelanggaran:req.params.id
    }
    let sql = "select * from pelanggaran where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

router.post("/pelanggaran", (req,res) => {
    let data = {
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin
    }
    let sql = "insert into pelanggaran set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

router.post("/pelanggaran", (req,res) => {
    let data = {
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin
    }
    let sql = "insert into pelanggaran set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

router.put("/pelanggaran", (req,res) => {
    let data = [
        {
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin
    },
    {
        id_pelanggaran: req.body.id_pelanggaran
    }
    ]
    let sql = "update pelanggaran set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(response)
    })
})

router.delete("/pelanggaran/:id", (req,res) => {
    let data = {
        id_pelanggaran: req.params.id
    }

    let sql = "delete from pelanggaran where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})

module.exports = router