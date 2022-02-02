const Voucher = require('./model');
const Category = require('../category/model');
const Nominal =  require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    index: async(req , res) =>{
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message : alertMessage, status : alertStatus};
            const voucher = await Voucher.find().populate('category').populate('nominals');
            
            res.render('admin/voucher/view_voucher',{
                voucher,
                alert,
                name: req.session.user.name,
                title: "Voucher"
            });
        } catch (error) {
            console.log(error)
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    },
    viewCreate: async(req , res) =>{
    try {
         const category = await Category.find();
         const nominal = await Nominal.find();

        res.render('admin/voucher/create',{
             category,
             nominal,
             name: req.session.user.name,
             title: "Voucher"
        });
    } catch (error) {
        console.log(error)
    }
    },
    actionCreate: async(req, res) =>{
        try {
          const { name, category, nominals} = req.body;

          if(req.file){
              let tmp_path = req.file.path;
              let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];

              let filename = req.file.filename + '.' +originalExt;
              let target_Path = path.resolve(config.rootPath, `public/uploads/${filename}`);
              
              const src = fs.createReadStream(tmp_path);
              const dest = fs.createWriteStream(target_Path);

              src.pipe(dest);

              src.on('end', async () =>{
                  try {
                      const voucher = new Voucher({
                          name,
                          category,
                          nominals,
                          thumbnail : filename
                      })
                      await voucher.save();
                    console.log('save success')
                      req.flash("alertMessage",`Berhasil Tambah Voucher`);
                      req.flash("alertStatus", 'success');
                      res.redirect("/voucher");
                  } catch (error) {
                    req.flash("alertMessage",`${error.message}`);
                    req.flash("alertMessage", 'danger');
                    res.redirect("/voucher");
                  }
              })
          }else{
            const voucher = new Voucher({
                name,
                category,
                nominals,
            })
            await voucher.save();

            req.flash("alertMessage",`Berhasil Tambah Voucher`);
            req.flash("alertStatus", 'success');
            res.redirect("/voucher");
          }
          
         
          
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    },
    viewEdit: async(req, res) =>{
        try {
            const {id} = req.params;
            const category = await Category.find();
            const nominal = await Nominal.find();
            let voucher = await Voucher.findOne({_id : id}).populate('category').populate('nominals')
            
            res.render('admin/voucher/edit',{
                voucher,
                category,
                nominal,
                name: req.session.user.name,
                title: "Voucher"
            })
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    },
    actionEdit: async(req, res) =>{
        try {
            const { id } = req.params;
            const { name, category, nominals} = req.body;
  
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
  
                let filename = req.file.filename + '.' +originalExt;
                let target_Path = path.resolve(config.rootPath, `public/uploads/${filename}`);
                
                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_Path);
  
                src.pipe(dest);
  
                src.on('end', async () =>{
                    try {
                        const voucher = await Voucher.findOne({_id: id });
                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage);
                        }
                        await Voucher.findOneAndUpdate({
                            _id: id
                        },{
                              name,
                            category,
                            nominals,
                            thumbnail : filename
                        });
                        console.log("successs")
                        req.flash("alertMessage",`Berhasil Ubah Voucher`);
                        req.flash("alertStatus", 'success');
                        res.redirect("/voucher");
                    } catch (error) {
                      req.flash("alertMessage",`${error.message}`);
                      req.flash("alertMessage", 'danger');
                      res.redirect("/voucher");
                    }
                })
            }else{
                await Voucher.findOneAndUpdate({
                    _id: id
                },{
                    name,
                  category,
                  nominals,
                })
  
              req.flash("alertMessage",`Berhasil Tambah Voucher`);
              req.flash("alertStatus", 'success');
              res.redirect("/voucher");
            }
            
           
            
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    },
    actionDelete: async(req, res) =>{
        try {
            const {id} = req.params;
           const voucher = await Voucher.findOneAndRemove({
                _id : id
            });
            
            let currentImage = `${config.rootPath}/public/uploads/${voucher._id}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage);
            }
            req.flash("alertMessage",`Berhasil Menghaspus Voucher`);
            req.flash("alertStatus", 'success');
            res.redirect('/voucher')
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    },
    actionStatus: async( req, res)=>{
        try {
            const {id} = req.params;
            let voucher = await Voucher.findOne({_id: id});
            let status = voucher.status === 'Y' ? 'N' : "Y";

            voucher = await Voucher.findOneAndUpdate({
                _id: id
            },{
                status
            });
            req.flash("alertMessage",`Berhasil Update Status Voucher`);
            req.flash("alertStatus", 'success');
            res.redirect('/voucher')
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/voucher");
        }
    }
}
