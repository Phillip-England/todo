//STANDARD
export const lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
export const uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
export const numbers = ['0','1','2','3','4','5','6','7','8','9']

//SYMBOL GROUPS
export const nameSymbols = ['\'']
export const passwordSymbols = ['!','@','#','$','%','^','*','-','_','+','+','?']
export const usernameSymbols = ['-', '_']
export const projectNameSymbols = ['-','_',' ']
export const textAreaSymbols = [' ','.',',',':',';','\'','"','-','?','!','_','@','#','$','%','(',')']

//WHITELISTS
export const passwordWhitelist = lowercase.concat(uppercase).concat(numbers).concat(passwordSymbols)
export const usernameWhitelist = lowercase.concat(uppercase).concat(numbers).concat(usernameSymbols)
export const projectNameWhitelist = lowercase.concat(uppercase).concat(numbers).concat(projectNameSymbols)
export const textAreaWhitelist = lowercase.concat(uppercase).concat(numbers).concat(textAreaSymbols)