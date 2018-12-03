import databaseApp from '../../utils/firebaseConfig'
import _ from 'lodash'

export const list = (reference, type, limit=10, offset=0, order='') => {
  return (dispatch)=>{
    dispatch({ type: "LOADING" })
    const messagesRef = databaseApp.database().ref(reference).orderByChild('date').limitToLast(200)
    messagesRef.on('value', snapshot => {
        let data = [], key
        const keys = Object.keys(snapshot.val())
        for (var i = 0; i < keys.length; i++) {
          key = keys[i]
          data.push({...snapshot.val()[key], key, id: key})
        }
        dispatch({ type , data: _.orderBy(data, ['date'],['desc']) })
    },err=>{
      console.log('err',err)
    })
  }
}

export const get = (reference, type) => {
  return (dispatch)=>{
    const messagesRef = databaseApp.database().ref(reference)
    dispatch({ type: "LOADING" })
    messagesRef.on('value', snapshot => {
        dispatch({ type , data: snapshot.val() })
    },err=>{
      console.log('err',err)
    })
  }
}

export const update = (data, reference, type) => {
  return (dispatch)=>{
      dispatch({ type: "LOADING" })
      databaseApp.database().ref(reference).set(data, (error) => {
        if (!error) {
          console.log("Data hss been update succesfully")
          dispatch({ type, newData: data })
        }
      })
  }
}

export const create = (data, reference, type) => {
  return (dispatch)=>{
      dispatch({ type: "LOADING" })
      databaseApp.database().ref(reference).push(data).then((snap) => {
         const key = snap.key
         dispatch({ type, newData: {...data, key} })
      })
  }
}

export const deleteData = ( reference ) => {
  databaseApp.database().ref(reference).remove().then((snap) => {
      console.log("data deleted")
  })
}
