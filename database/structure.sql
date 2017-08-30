CREATE TABLE `entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT '',
  `first_name` varchar(90) DEFAULT '',
  `last_name` varchar(90) DEFAULT '',
  `phone` varchar(90) DEFAULT '',
  `zipcode` varchar(20) DEFAULT '',
  `departure_city` varchar(260) DEFAULT '',
  `Time` int(11) DEFAULT NULL,
  `accept_terms` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187936 DEFAULT CHARSET=utf8;