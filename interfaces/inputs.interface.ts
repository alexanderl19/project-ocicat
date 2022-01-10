export interface Instructor {
  name: string;
  shortened_name: string;
}
export type Quarter = string;
export type Year = string;
export interface Department {
  department: string;
  department_name: string;
}

export interface Grade {
  grade_a_count: number;
  grade_b_count: number;
  grade_c_count: number;
  grade_d_count: number;
  grade_f_count: number;
  grade_p_count: number;
  grade_np_count: number;
  grade_w_count: number;
  instructors: string[];
  quarter: Quarter;
  year: Year;
  department: string;
  course_id: string;
  code: string;
}
