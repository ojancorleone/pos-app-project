module.exports = () => {
    
    let module = {};

    module.allMandatoryFieldsExists = (requestBody, mandatoryFields) => {
        let allMandatoryExists = true;
        mandatoryFields.map(field =>{
            if(!Object.keys(requestBody).includes(field))
                allMandatoryExists = false;
        });
        return allMandatoryExists
    };
    return module;
}