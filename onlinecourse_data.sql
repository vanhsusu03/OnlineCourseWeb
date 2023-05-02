USE onlinecourse;

INSERT INTO category (name) VALUES
('Math'),
('Design'),
('Development'),
('Psychology'),
('Music'),
('Health'),
('Lifestyle'),
('Media'),
('IT/Software'),
('Economic'),
('Chemistry'),
('Physics');

INSERT INTO student (first_name, last_name, email, phone, birthday, username, password, registration_date, is_instructor) VALUES
('Hai', 'Vo Dinh', 'haovoding@gmail.com', '01313151555', '1999-12-12', 'haivodinh99', 'ffwfwe@fsfniow', '2019-03-02', 1),
('Thach', 'Tuong Gioi', 'thachcaodongho@vnu.com', '09585781', '2000-02-20', 'gioigoigoia', '31313@fsfniow', '2015-02-18', 1),
('Yen', 'Vo Dinh', 'thienhavosong@gmail.com', '0444411111', '1998-11-03', 'thienhavossss', 'bfwf5dafpiow', '2011-07-23', 1);

INSERT INTO instructor (instructor_id ,qualification, introduction_brief, transfer_info) VALUES
(1, 'Olympic', 'Good teacher', 'BIDV_414151589_VoDinhHai'),
(2, 'Olympic', 'Good teacher', 'Vietcombank_998888711_TranGioiNhat'),
(3, 'Olympic', 'Good teacher', 'Agribank_75141414556_NgoThanhYen');

INSERT INTO course (instructor_id, title, description, image, release_date, course_fee) VALUES
(1, 'Web Design for Beginners: Real World Coding in HTML & CSS', 'Launch a career as a web designer by learning HTML5, CSS3, responsive design, Sass and more!', 'https://img-c.udemycdn.com/course/240x135/246154_d8b0_3.jpg', '2020-04-30', '20'),
(2, 'Learn Thai Yoga Massage', "Learn everything you need to know to give Thai Yoga massage even if you've never given a massage before.", 'https://img-c.udemycdn.com/course/240x135/35426_2c79_8.jpg', '2022-12-01', '15'),
(3, 'Acoustic Guitar and Electric Guitar', 'Acoustic Guitar Theory, Fingerpicking, Fretting, Chords: Most Important 25 Videos For Getting Started w/ Playing Guitar', 'https://img-c.udemycdn.com/course/240x135/41884_8039_8.jpg', '2019-10-23', '18');

INSERT INTO course_category (course_id, category_id) VALUES
(1, 2),
(1, 9),
(2, 6),
(3, 5);

INSERT INTO content_type (content_type) VALUES
('video');

INSERT INTO chapter (course_id, title) VALUES
(2, 'The Art of massagin with ease'),
(2, 'Body Mechanics');

INSERT INTO content (chapter_id, content_type_id, time_required_in_sec, link)  VALUES
(1, 1, 60, 'https://mp4-b.udemycdn.com/2013-02-09_15-08-09-bc0a4c09b83fcacbe747c26ec99d5d53/WebHD.mp4?secure=j5ODxJM8cTc3QQmRi7r-ZA%3D%3D%2C1682882790'),
(2, 1, 74, 'https://mp4-b.udemycdn.com/2013-01-09_13-44-24-c7289c699d7985d0468d0a4192bbcaf2/WebHD.mp4?secure=d-I_fRd9NaeIFuvIDkzHPg%3D%3D%2C1682882790');