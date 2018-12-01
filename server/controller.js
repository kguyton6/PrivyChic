const bcrypt = require('bcryptjs')


module.exports = {
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
        console.log('session destroyed')

    },

    get_user: (req, res) => {
        const dbInstance = req.app.get('db')
        console.log(req.session.user.user_id)

        dbInstance.get_user(req.session.user.user_id)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => console.log(err, 'getuser error'))
    },

    stylist_zip: async(req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.params.id)

        dbInstance.stylist_zip(req.params.id)
      .then((data) => res.status(200).send(data))

    },
    stylist_name: async(req, res, next) => {
        const dbInstance = req.app.get('db')
        const {full_name} = `%${req.params.id}%`

        dbInstance.stylist_name(full_name)
        .then((data) => {
        res.status(200).send(data)
        })
    },
    accept_payments: (req, res) => {
      const dbInstance = req.app.get('db')

        console.log(req.body)

        dbInstance.accept_payments()
        .then((data) => res.status(200).send(data))

    },

    get_availablility: async(req, res) => {
        const dbInstance = req.app.get('db')

        let match = await dbInstance.get_availability(req.params.id)
            if(match){
                let id = match[0].business_id
               let data = await dbInstance.getStylist(id)
                res.status(200).send(data)
            }
    },

    getStylist: async(req, res) => {
        const dbInstance = req.app.get('db')

       dbInstance.getStylist(req.params.id)
       .then((data) => {
          res.status(200).send(data) 
        })
    //    let responseStylist = { stylist, availability }  
    },
    

    create_business: async(req, res, next) => {
        const dbInstance = req.app.get('db')
        const {full_name, email, password, business_name, phone_number, streetaddress, city, state, zipcode, portfolio, first_name, last_name, profession, about, picture, accept_payment } = req.body
        
        let user = await dbInstance.check_user(email)
        // let result = await bcrypt.compareSync(password, user[0].password)
        if(user[0]){
            req.session.user = user[0]

        } else {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            user =  await dbInstance.create_user(full_name, email, hash, 'business')
            req.session.user = user[0]
        }
       
        let newBusiness = await dbInstance.create_business(req.session.user.user_id, business_name, phone_number, streetaddress, city, state, zipcode, portfolio, full_name, first_name, last_name, profession, about, picture, accept_payment)
        if(newBusiness){
         let updatedUser = await dbInstance.updateUser('business', newBusiness[0].user_id)
         if(updatedUser){
            req.session.user = updatedUser[0]
            let responseUser = {updatedUser: req.session.user, newBusiness}
            res.status(200).send(responseUser)
         }
      } else {
          res.status(401).send('registration error')
      }
    },
    get_calendar: (req, res) => {
      const  dbInstance = req.app.get('db')

      dbInstance.get_calendar()
          .then((data) => res.status(200).send(data))
      
  },

    allServices: async(req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(req.params.id)

        let service = await dbInstance.allServices(req.params.id)
        let calendar  = await dbInstance.appointment_times(req.params.id)

        let response = {service, calendar}
        res.status(200).send(response)
        

    },
    create_booking: (req, res) => {
            const dbInstance = req.app.get('db')
            const { service_id, calendar_id } = req.body
            console.log(service_id, calendar_id, token)

          
           dbInstance.create_booking(service_id, req.params.id, req.session.user.user_id, calendar_id, token)
            .then((appointment) => res.status(200).send(appointment))
          
    },
    create_token: (req, res) => {
        const dbInstance = req.app.get('db')
        const {token} = req.body

        dbInstance.create_token(token, req.params.id)
        .then((res) => {
            console.log(res)
        })
    },
  

    business_login: async (req, res) => {
        const dbInstance = req.app.get('db')
        const { email, password } = req.body
        console.log(email, password)

        let user = await dbInstance.check_user(email)

        let result = await bcrypt.compareSync(password, user[0].password);
        console.log(result)
        if (!result) {
            res.sendStatus(401)
        }else {
            req.session.user = user[0]
        }
        
         let business = await dbInstance.check_business(req.session.user.user_id)
           if(business){
               req.session.user = business[0]
               console.log(business)
               res.status(200).send(req.session.business)
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
