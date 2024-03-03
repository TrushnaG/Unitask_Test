import * as bcrypt from 'bcryptjs';

export const commonFunc = {
    passwordCompare:async (enteredPwd:string, userPwd:string) =>{
      const match = await bcrypt.compareSync(enteredPwd, userPwd)
      return match;
    },
    generateHashPassword: async (password:string, salt:number) => {
      const hash = await bcrypt.hashSync(password, salt)
      return hash;
    },
  }
  