//one to many implementation

const mongoose = require('mongoose');

main()
.then(result =>{ console.log("DB connected successfully"); })
.catch(err=> console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}


// =================================================================================>>>>>>>>>>>>
//oredr part
const orderSchema = new mongoose.Schema({

    item:String,
    price:String
});

const Order = mongoose.model("Order",orderSchema);


        const addOrder =async()=>{

        let res = await Order.insertMany([
            {item:"Samosa" , price:"20"},
            {item:"chips" , price:"5"},
            {item:"Chocolate" , price:20}
        ]);

        console.log(res);
        } 

// addOrder();


// =================================================================================>>>>>>>>>>>>



// =================================================================================>>>>>>>>>>>>
//customer part

        const customerSchema = new mongoose.Schema({
            name:String,
            orders:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Order"
                },
            ],
        })


// #########################################################################################################################################
// Mongoose middle ware
        customerSchema.pre("findOneAndDelete",async( customer )=>{
        
                console.log("PRE Middleware");
                console.log(customer);
                
            // if((customer.orders).length)       
            // {
            //     await Order.deleteMany( {_id: { $in: customer.orders }});       //now it will delete all the oredrs on deletion of the customer
            // }
        });


        // customerSchema.post("findOneAndDelete",async()=>{
        //     console.log("POST middle ware");
        // });
        
        const Customer = mongoose.model("Customer" , customerSchema);

// #########################################################################################################################################


    const addCustomer = async()=>{
        const cust1 = new Customer({
            name:"Nishant garg",
        })

        let order1 = await Order.findOne({item:"Samosa"});
        let order2 = await Order.findOne({item:"Chocolate"});

        cust1.orders.push(order1);
        cust1.orders.push(order2);

        let result =  await cust1.save();

        console.log(result);
    }

// addCustomer();


        const findCustomer = async()=>{

            const res = await Customer.find({}).populate("orders");
            console.log(res);    
        }

// findCustomer();

// =================================================================================>>>>>>>>>>>>



// =================================================================================>>>>>>>>>>>>
///some functions
            
        let addcust = async()=>{

            const newcust = new Customer({
                name:"Nishu Garg"
            });

            const neworder = new Order({
                item:"New burger",
                price:"1200",
            });

            newcust.orders.push(neworder);

            await neworder.save();
            await newcust.save();

            console.log("customer added");
        }

// addcust();



// =================================================================================>>>>>>>>>>>>
// Understanding the mongoose middleware  so that we can delete the order on deletion of the customer


        //delete customer ( if we simply delete the customer then corresponding orders will not get deleted)
        const delcust = async()=>{

            let data = await Customer.findByIdAndDelete('66d84630d9c6093dd16310c4');

            console.log("deleted data", data);
            
        }
delcust();
// =================================================================================>>>>>>>>>>>>
