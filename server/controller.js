
module.exports = {
    logout: (req, res) => {
        req.session.destroy()
        console.log('session destroyed')
        res.redirect('https://privychic.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000')
    },

    getuser: (req, res) => {
    const dbInstance = req.app.get('db')
    console.log(req.session.user.user_id)

    dbInstance.getuser(req.session.user.user_id)
    .then((data) => {
        res.status(200).send(data)
    }).catch(err => console.log(err, 'getuser error'))
    },
   
    stylist_zip: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.stylist_zip(req.params.zip)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err,'getstylist error'))
    },
    stylist_name: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.stylist_name(req.params.name)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err,'getstylist error'))
    },

    getStylist: (req, res) => {
        const dbInstance = req.app.get('db')


        dbInstance.getStylist(req.params.id) 
        .then((profile) => res.status(200).send(profile))
        .catch(err => console.log(err, 'profile error in controller'))
    }
    


    

            }
        
