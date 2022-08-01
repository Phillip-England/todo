export const chars = {
  whitelistDefault: () => {
      return ['\!','\(','\)','\'','\.','\?','\[','\]','\_','\`','\~','\;','\:','\@','\#','\$','\%','\^','\&','\*','\+','\=','0','1','2','3','4','5','6','7','8','9','A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z']
  },
  whitelistUsername: () => {
      return ['\-','\_','0','1','2','3','4','5','6','7','8','9','A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z']
  },
  whitelistName: () => {
      return ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z','\'']
  },
  whitelistAlpha: () => {
      return ['.', ' ', '\'', 'A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z']
  },
  whitelistNumbers: () => {
      return ['0','1','2','3','4','5','6','7','8','9']
  },
  nameNoRepeatList: () => {
      return ['\'']
  },
  whitelistPhone: () => {
      return ['0','1','2','3','4','5','6','7','8','9','(',')','-']
  },

  upperCase: () => {
      return ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  },

  lowerCase: () => {
      return ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  },

  passwordSymbols: () => {
      return ['\!','\(','\)','\-','\.','\?','\[','\]','\_','\`','\~','\;','\:','\@','\#','\$','\%','\^','\&','\*','\+','\=','\{','\}','\?','\'','\"','\?','\\','\/','\>','\<','\,','\|']
  },
  randAplha: (length) => {
      let lowerCaseLetters = chars.lowerCase()
      let upperCaseLetters = chars.upperCase()
      let allLetters = lowerCaseLetters.concat(upperCaseLetters)
      let randomString = ''
      let randomCharacter
      for (x = 0; x < length; x++){
          randomCharacter = allLetters[Math.floor(Math.random() * allLetters.length)]
          randomString = randomString + randomCharacter
      }
      return randomString
  }
}
