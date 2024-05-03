export class FindAllUserDto{
    orderById?: 'DESC' | 'ASC';
    limit?: string;
    fname?: string;
    lname?: string;
    phone?: string;
    email?: string;
    role?: 'true' | 'false';
    orders?: 'true' | 'false';  
    questions?: 'true' | 'false';

}
