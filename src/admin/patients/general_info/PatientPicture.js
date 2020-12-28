import React, { useState } from 'react'
import { Upload, message } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const PatientPicture = ({ image, setImage, dispatchPatient }) => {
  const [loadingImage, setLoadingImage] = useState(false)
  const uploadImage = async options => {
    setImage(null)
    const { onSuccess, onError, file } = options
    const contentType = file.type
    const config = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    }
    let response
    try {
      response = await axios.get(
        '/get-presigned-url/',
        config
      )
    } catch (err) {
      message.error('Profile image was not uploaded. Please try again.')
      setLoadingImage(false)
      onError({ err })
      return
    }
    const { data } = response
    dispatchPatient({ type: 'UPDATE', updatedValues: { profilePictureUrl: `${data.url}${data.fields.key}` } })
    const form = new FormData()
    for (const [key, value] of Object.entries(data.fields)) {
      form.append(key, value)
    }
    form.append('file', file)
    const instance = axios.create()
    instance.interceptors.request.use(config => config)
    try {
      await instance.post(data.url, form)
    } catch (err) {
      message.error('Profile image was not uploaded. Please try again.')
      setLoadingImage(false)
      onError({ err })
    }
    onSuccess('Ok')
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImage(imageUrl)
        setLoadingImage(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='ant-upload-text'>Upload Photo</div>
    </div>
  )

  return (
    <Upload
      name='profilePicture'
      listType='picture-card'
      showUploadList={false}
      customRequest={uploadImage}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {image ? <img src={image} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

PatientPicture.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.func,
  dispatchPatient: PropTypes.func
}

export default PatientPicture
