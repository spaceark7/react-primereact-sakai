import React, { useEffect } from 'react'
import { useAuthApi } from '../logics/useAuthApi'
import { InputText } from 'primereact/inputtext'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { useUserApi } from '../logics/app/user'

const Profile = () => {
  const [search, setSearch] = React.useState('')
  const debouncedValue = useDebounceValue(search, 500)

  // Fetch profile data using the custom hook
  const {
    profile
  } = useAuthApi()
  const usersApi = useUserApi()

  const { data, isLoading, isError, } = profile(1)
  const { data: usersData, refetch } = usersApi.findMany({
    name: debouncedValue,
  })

  const handleSearch = (event) => {
    //Create debounce value
      setSearch(event.target.value)
  }

  useEffect(() => {
    if (debouncedValue) {
      console.log('Making API call with:', debouncedValue)
      // Perform your API call or other debounced action here
      refetch()
    }
  }, [debouncedValue, refetch])


  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading profile</div>

  return (
    <>
    <div className='card'>
      <h1>Profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    <div className='card'>
      <h1>Search User</h1>
      <InputText
        value={search}
        onChange={handleSearch}
        placeholder='Search by name...'
      />
      <pre>{JSON.stringify(usersData, null, 2)}</pre>
    </div>
    </>
  )
}

export default Profile