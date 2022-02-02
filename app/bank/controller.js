const Bank = require('./model');

module.exports = {
    index: async(req , res) =>{
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message : alertMessage, status : alertStatus};
            const bank = await Bank.find();
           
            res.render('admin/bank/view_bank',{
                bank,
                alert,
                name: req.session.user.name,
                title: "Bank"
            });
        } catch (error) {
            
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
        }
    },
    viewCreate: async(req , res) =>{
    try {
        res.render('admin/bank/create',{
            name: req.session.user.name,
            title: "Bank"
        });
    } catch (error) {
        
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
    }
    },
    actionCreate: async(req, res) =>{
        try {
          const {name, nameBank, nomorRekening} = req.body;
          
          let bank = await Bank({ name , nameBank , nomorRekening});
          await bank.save();
            req.flash("alertMessage",`Berhasil Tambah Bank`);
            req.flash("alertStatus", 'success');

          res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
        }
    },
    viewEdit: async(req, res) =>{
        try {
            const {id} = req.params;

            let bank = await Bank.findOne({_id : id});
            
            res.render('admin/bank/edit',{
                bank,
                name: req.session.user.name,
                title: "Bank"
            })
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
        }
    },
    actionEdit: async(req, res) =>{
        try {
            const {id} = req.params;
            const {name, nameBank, nomorRekening} = req.body;

            await Bank.findOneAndUpdate({
                _id: id
            },{
                name, nameBank, nomorRekening
            })
            req.flash("alertMessage",`Berhasil Edit Bank`);
            req.flash("alertStatus", 'success');
            res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
        }
    },
    actionDelete: async(req, res) =>{
        try {
            const {id} = req.params;
            await Bank.findOneAndRemove({
                _id : id
            });
            req.flash("alertMessage",`Berhasil Menghaspus Bank`);
            req.flash("alertStatus", 'success');
            res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/bank");
        }
    }
}
