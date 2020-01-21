/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {

  let xhr = new XMLHttpRequest;
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;
  let requestMethod = options.method;
  let response;
	let address;
  let formData;
  let dataInRequest;
  let dataInURL;
  
  if (options.headers !== undefined) {
    for (let item in options.headers) {
        xhr.setRequestHeader(item, options.headers[item]);
    } 
  }
 
  if (requestMethod === 'GET') {
    if (options.data) {
      dataInRequest = options.data;
      dataInURL = '?';
      for (let item in dataInRequest) {
        if (dataInURL == '?') {
          dataInURL = `${dataInURL}${item}=${dataInRequest[item]}` 
        } else {
          dataInURL = `${dataInURL}&${item}=${dataInRequest[item]}`
        }
      }
      address = `${options.url}${dataInURL}`
    } else {
      address = options.url;
    }

  } else {
    address = options.url;
    for (let item in options.data) {
      formData.append(item, options.data[item]);

    }
  }
  
  xhr.open(requestMethod, address);
  xhr.send(formData);

  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    response = xhr.response;
    let err = null;
    callback(err, response);
  } else {
    console.log(`В ходе выполнения запроса к серверу произошла ошибка`);
    response = xhr.response;
    err = xhr.status;
    callback(err, response);
  }

};

// let inputtest =  { data: { 
//   username: 'ivan@poselok.ru',
//   password: 'odinodin'
// }
// }

// let formDataTEST = new FormData;
// let dataInRequestTEST = inputtest.data;
// for (let item in dataInRequestTEST) {
//   formDataTEST.append(item, dataInRequestTEST[item]);
//   console.log(formDataTEST);
// }



// const xhr = createRequest({
//     url: 'https://example.com', // адрес
//     headers: { // произвольные заголовки, могут отсутствовать
//       'Content-type': 'application/json' 
//     },
//     data: { // произвольные данные, могут отсутствовать
//       username: 'ivan@poselok.ru',
//       password: 'odinodin'
//     },
//     responseType: 'json', // формат, в котором необходимо выдать результат
//     method: 'GET', // метод запроса
//     /*
//       Функция, которая сработает после запроса.
//       Если в процессе запроса произойдёт ошибка, её объект
//       должен быть в параметре err.
//       Если в запросе есть данные, они должны быть переданы в response.
//     */
//     callback: (err, response) => {
//       console.log( 'Ошибка, если есть', err );
//       console.log( 'Данные, если нет ошибки', response );
//     }
//   });