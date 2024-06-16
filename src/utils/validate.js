
export const isValideForm = (email,password) => {
 
    const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isValidePaswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
// const isValidateName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)
    if(!isValidEmail) return "Nat valid Email id";
    if(!isValidePaswd) return "Not valid password";
    // if(!isValidateName) return "Not valid Name";
    return null;
}



