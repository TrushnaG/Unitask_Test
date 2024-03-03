export const commonRes = {
    logInRes: (userId: number, full_name:string, email: string, phone_no: string, token: string) => {
      return {
        "user_id": userId,
        "full_name":full_name,
        "email": email,
        "phone_no":phone_no,
        "accessToken": token
      }
    },
    signUpRes: (userId: number, full_name:string, email: string, phone_no: string,gender: string, token: string) => {
      return {
        "user_id": userId,
        "full_name":full_name,
        "email": email,
        "phone_no":phone_no,
        "gender":gender,
        "accessToken": token
      }
    }
  }