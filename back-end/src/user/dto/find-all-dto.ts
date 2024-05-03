export class FindAllUserDto {
  orderById?: 'DESC' | 'ASC';
  limit?: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role: 'true' | 'false';
  order: 'true' | 'false';
  question: 'true' | 'false';
}


export class FindAllOrderDto {
  orderById?: 'DESC' | 'ASC';
  limit?: string;
  status: string;
  startdate: string;
  enddate: string;
  user: 'true' | 'false'; 
  course: 'true' | 'false';
  categorys: 'true' | 'false';
  images: 'true' | 'false';
  courseName: string;
  description: string;
  price
}

export class FindAllCourseDto{
  orderById?: 'DESC' | 'ASC';
  limit?: string;
  courseName
  orders?: 'true' | 'false';
  images?: 'true' | 'false';
  categorys?: 'true' | 'false';
}

export class FindAllCategoryDto {
  orderById?: 'DESC' | 'ASC';
  limit?: string;
  name: string;
  type: string;
  course: 'true' | 'false';
}