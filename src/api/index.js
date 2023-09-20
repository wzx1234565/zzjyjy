import http from '@/api/http'
export const logins=(params)=>http.post('/login',params);
export const getuser=(params)=>http.get('/users',{params});
export const getadd=(params)=>http.post('/users',params);
export const getbj=(params)=>http.put(`/users/${params.id}`,params);
export const getdel=(params)=>http.delete('/users/:id',params);