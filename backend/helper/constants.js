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
    },
    VALIDATION : {
            KEYWORD_NOT_EXIST : "keyword doesn't exist",
            KEYWORDS_IS_EMPTY : "keyword can't be empty",
            PAGE_NOT_EXIST : "page doesn't exist",
            PAGE_IS_EMPTY : "page can't be empty",
            PAGE_IS_NUMERIC : "page should be numeric",
            ITEM_PAGE_NOT_EXIST : "items_per_page doesn't exist",
            ITEM_PAGE_IS_EMPTY : "items_per_page can't be empty",
            ITEM_PAGE_IS_NUMERIC : "items_per_page should be numeric",
            ID_NOT_EXIST : "id doesn't exist",
            ID_IS_EMPTY : "id can't be empty",
            ID_IS_NUMERIC : "id should be numeric",
            NAME_NOT_EXIST : "name doesn't exist",
            NAME_IS_EMPTY : "name can't be empty",
            CATEGORY_ID_NOT_EXIST : "category_id doesn't exist", 
            CATEGORY_ID_IS_EMPTY : "category_id can't be empty",
            CATEGORY_ID_IS_NUMERIC : "category_id should be numeric",
            PRICE_NOT_EXIST : "price doesn't exist",
            PRICE_IS_EMPTY : "price can't be empty",
            PRICE_IS_NUMERIC : "price should be numeric",
            IMAGE_URL_NOT_EXIST : "image_url doesn't exist",
            IMAGE_URL_IS_EMPTY : "image_url can't be empty",
            IMAGE_URL_IS_URL : "Invalid format image_url",
            STOCK_NOT_EXIST : "stock doesn't exist",
            STOCK_IS_EMPTY : "stock can't be empty",
            STOCK_IS_NUMERIC : "stock should be numeric",
            DESCRIPTION_NOT_EXIST : "description doesn't exist",
            DESCRIPTION_IS_EMPTY : "description can't be empty",
            LOGO_NOT_EXIST : "logo doesn't exist",
            LOGO_IS_EMPTY : "logo can't be empty",
            LOGO_IS_URL : "Invalid format logo",
            USERNAME_NOT_EXIST : "username doesn't exist",
            USERNAME_IS_EMPTY : "username can't be empty",
            FIRSTNAME_NOT_EXIST : "firstname doesn't exist",
            FISRTNAME_IS_EMPTY : "firstname can't be empty",
            LASTNAME_NOT_EXIST : "lastname doesn't exist",
            LASTNAME_IS_EMPTY : "lastname can't be empty",
            EMAIL_NOT_EXIST : "email doesn't exist",
            EMAIL_IS_EMPTY : "email can't be empty",
            EMAIL_IS_EMAIL : "Invalid format email",
            ROLE_NOT_EXIST : "role doesn't exist",
            ROLE_IS_EMPTY : "role can't be empty"
    }
}