import axios from 'axios'
import { useState } from 'react'
import PopUp from '../components/Warning'

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      setErrors(null)
      const response = await axios[method](url, body)
      if (onSuccess) {
        onSuccess(response.data)
      }
      return response.data
    } catch (err) {
          console.log(response.data);
    }
  }

  return { doRequest, errors }
}
