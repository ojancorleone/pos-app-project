module.exports = {
    GREETING_MESSAGE : "::: backend pos-app is ready to rock !! :::",
    BASE_URL : "api",
    ACCESS : {
        ADMINISTRATOR : {
            READ    : ["user", "store", "cart", "order", "dashboard", "product"],
            WRITE   : ["user", "store", "cart", "order", "dashboard", "product"]
        },
        CASHIER : {
            READ    : ["store", "cart", "order", "product"],
            WRITE   : ["store", "cart", "order", "product"]
        },
        INVENTORY : {
            READ    : ["store", "product"],
            WRITE   : ["store", "product"]
        }
    }

}