module.exports = () => {
    
    let module = {};

    module.getTotalAmount = (arrayObject, initialValue) => {
        return arrayObject.reduce((total, currentPointer) => {
            return parseInt(total) + parseInt(currentPointer.amount)}, 
            initialValue);
    };

    return module;
}