const bcrypt = require('bcryptjs')


module.exports = {
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
        console.log('session destroyed')

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

        dbInstance.stylist_zip(req.params.id)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'getstylist error'))
    },
    stylist_name: (req, res, next) => {
        const dbInstance = req.app.get('db')
        let {full_name} = `%${req.params.id}%`

        dbInstance.stylist_name(full_name)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'getstylist error'))
    },
    get_availablility: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_availability(req.params.id)
            .then((data) => res.status(200).send(data))
    },

    getStylist: (req, res) => {
        const dbInstance = req.app.get('db')


        dbInstance.getStylist(req.params.id)
            .then((profile) => res.status(200).send(profile))
            .catch(err => console.log(err, 'profile error in controller'))
    },

    create_business: async(req, res, next) => {
        const dbInstance = req.app.get('db')
        const { business_name, phone_number, streetaddress, state, zipcode, city } = req.body

        let business = await dbInstance.get_business(req.params.id)
        if(business[0]){ return res.status(401).send('business already created')
      } else {
        dbInstance.create_business(req.params.id, business_name, phone_number, streetaddress, state, zipcode,  city)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'create business error'))
         }
    },
    create_profile: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { first_name, last_name, profession, about, picture } = req.body

        dbInstance.create_profile(req.params.id, profession, about, picture,  first_name, last_name)
            .then(() => res.status(200).send('profile success'))
            .catch(err => console.log(err, 'profile error'))
    },

    allServices: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.allServices(req.params.id)
            .then((data) => res.status(200).send(data))
    },

    get_hours: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_hours(req.params.id)
            .then((data) => res.status(200).send(data))
            .catch(err => console.log(err, 'get hours error'))
    },

    get_business: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_business(req.session.user.user_id)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err, 'get business error'))
    },

    business_login: async (req, res) => {
        const dbInstance = req.app.get('db')
        const { email, password } = req.body
        console.log(email, password)

        let user = await dbInstance.check_user(email)

        let result = await bcrypt.compareSync(password, user[0].password);
        console.log(result)
        if (result) {
            req.session.user = user[0]
            res.status(200).send('success')
            console.log(req.session)
            app.get('/api/getbusiness', (req, res) => {
                dbInstance.get_business(req.session.user.user_id)
                console.log(data)
                    .then((data) => res.status(200).send(data))
            }) .catch(err => console.log(err, 'get business login error'))
        } else {
            res.status(401).send('wrong password')
        }
    },
    delete_user: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.delete_user(req.params.id)
            .then(() => res.status(200).send('user deleted'))
    },
    delete_business: (req, res) => {
       const dbInstance = req.app.get('db')

       dbInstance.delete_business(req.params.id)
       .then(() => res.status(200).send('delete business success'))
    }

}

