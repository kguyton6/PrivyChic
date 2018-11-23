
module.exports = {
    logout: (req, res) => {
        req.session.destroy()
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
        .catch(err => console.log(err,'getstylist error'))
    },
    stylist_name: (req, res, next) => {
        const dbInstance = req.app.get('db')
        let full_name = `${req.params.id}%`

        dbInstance.stylist_name(full_name)
        .then((data) => res.status(200).send(data))
        .catch(err => console.log(err,'getstylist error'))
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
     
    create_business: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {business_name, phone_number, streetaddress, city, state, zipcode} = req.body

        dbInstance.create_business(req.session.user.user_id, business_name, phone_number, streetaddress, city, state, zipcode)
        .then((res) => res.status(200).send('business create successful'))
        .catch(err => console.log(err, 'error'))
    },

    create_profile: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {full_name, profession, about, picture} = req.body

        dbInstance.create_profile(req.session.user.user_id, full_name, profession, about, picture)
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

    business_login: async(req, res) => {
        const dbInstance = req.app.get('db')
        const {email, password} = req.body
        console.log(email, password)
      
        let user = await dbInstance.check_user(email)
      
        let result = await bcrypt.compareSync(password, user[0].password);
        console.log(result)
       if (result) {
          req.session.user = user[0]
          res.status(200).send('success')
            console.log(req.session)
            app.get('/api/getbusiness', (req, res) => {
              dbInstance.getbusiness(req.session.user.user_id)
              .then((user) => res.status(200).send(user))
            })
          } else {
          res.status(401).send('wrong password')
        }
      }
      
    


    

            }
        
