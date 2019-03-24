
module.exports = () => {

    let module = {}

    module.generateCurrentDateTime = () =>{
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date+' '+time;
    }

    return module;
}