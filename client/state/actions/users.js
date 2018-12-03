import 'isomorphic-fetch';
import databaseApp from '../../utils/firebaseConfig'

export const settings = () => {
  return (dispatch)=>{
    const messagesRef = databaseApp.database().ref('settings')
    messagesRef.on('value', snapshot => {
        let cleanData, key
        const keys = Object.keys(snapshot.val())
        for (var i = 0; i < keys.length; i++) {
          key = keys[i]
          cleanData = snapshot.val()[key]
        }
        dispatch({ type: 'SETTINGS_FETCHED', settings: {...cleanData, key } })
    },err=>{
      console.log('err',err)
    })
  }
}

export const updateSettings = (data) => {
  return (dispatch)=>{
      dispatch({ type: 'UPDATING_SETTINGS'})
      databaseApp.database().ref('settings/'+data.key).set(data, (error) => {
        if (!error) {
          console.log("Data hss been saved succesfully")
          dispatch({ type: 'UPDATED_SETTINGS', newSettings: data })
        }
      })
  }
}
