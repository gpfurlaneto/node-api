import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Env from "../../config/Env"
import UserEntity from "../entity/UserEntity"
import Unauthorized from "../../types/exception/Unauthorized"

export default class UserDomain {

  private constructor() {}

  static instance() {
    return new UserDomain()
  }

  async login(username: string, password: string) {
    const user = await UserEntity.findOne({ username })

    if(!user){
      throw new Unauthorized()
    }

    if(!(await bcrypt.compare(password, user.password))){
      throw new Unauthorized()
    }

    const token = jwt.sign({ 
      id: user.id,
      username: user.username
     }, Env.SECRET_JWT, {
      expiresIn: 3600
    })

    return {
      user,
      token
    }
  }

  async hasPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

}