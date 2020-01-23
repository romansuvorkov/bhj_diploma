/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  let xhr = new XMLHttpRequest;
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;
	let address;
  let formData = new FormData;

  
  if (options.method === 'GET') {
    if (options.data) {
      let dataInURL = '?';
      for (let item in options.data) {
        if (dataInURL == '?') {
          dataInURL = `${dataInURL}${item}=${options.data[item]}` 
        } else {
          dataInURL = `${dataInURL}&${item}=${options.data[item]}`
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
      console.log(formData);
    }
  }

  console.log(address);
  xhr.open(options.method, address);

  if (options.headers !== undefined) {
    for (let item in options.headers) {
        console.log(item);
        console.log(options.headers[item]);
        xhr.setRequestHeader(item, options.headers[item]);
    } 
  }

  xhr.onerror = function() {
    options.callback(new Error(`Не удалось загрузить данные${xhr.status}`), 0);
  };

  xhr.onload = function () {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    console.log(xhr.readyState);
    console.log(xhr.response);
    try {
      options.callback(0, xhr.response);
    }
    catch (err) {
      options.callback(err, 0);
  }
  }
  }

  if (options.method === 'GET') {
    xhr.send();
  }
  else {
    xhr.send(formData);
  };

  return xhr;

};


// const fhr = createRequest({
//   url: 'https://bhj-diplom.letsdocode.ru/account', // адрес
//   headers: { // произвольные заголовки, могут отсутствовать
//     'Content-type': 'application/json' 
//   },
//   data: { // произвольные данные, могут отсутствовать
//     username: 'ivan@poselok.ru',
//     password: 'odinodin'
//   },
//   responseType: 'json', // формат, в котором необходимо выдать результат
//   method: 'GET', // метод запроса
//   /*
//     Функция, которая сработает после запроса.
//     Если в процессе запроса произойдёт ошибка, её объект
//     должен быть в параметре err.
//     Если в запросе есть данные, они должны быть переданы в response.
//   */
//   callback: (err, response) => {
//   if (err !== 0) {
//     console.log( 'Ошибка, если есть', err );
//   }
//   if (response !== 0) {
//     console.log( 'Данные, если нет ошибки', response );
// //   }
    
  
// }
// });

// // console.log(fhr);