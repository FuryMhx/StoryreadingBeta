

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for storylist
-- ----------------------------
DROP TABLE IF EXISTS `storylist`;
CREATE TABLE `storylist`  (
  `sid` int(21) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `image` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '封面',
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '诗人' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of storylist
-- ----------------------------
INSERT INTO `storylist` VALUES (13, 'The Very Hungry Caterpillar', 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami.', 's4.jpg');
INSERT INTO `storylist` VALUES (14, 'Guess How Much I Love You', 'Little Nutbrown Hare, who was going to bed, held on tight to Big Nutbrown Hare\'s very long ears.', 's3.jpg');
INSERT INTO `storylist` VALUES (15, 'The Rainbow Fish', 'His scales were every shade of blue and green and purple, with sparkling silver scales  among them.', 's2.jpg');
INSERT INTO `storylist` VALUES (16, 'Goodnight Moon', 'The cow jumping over the moon. And there were three bears sitting on chairs.', 's0.jpg');
INSERT INTO `storylist` VALUES (17, 'Brown Bear, Brown Bear, What Do You See?', 'White dog, white dog ,what do you see? I see a black sheep looking at me.', 's5.jpg');
INSERT INTO `storylist` VALUES (18, 'Corduroy by Don Freeman', 'Corduroy is a bear who once lived in thetoy department of a big store. Day after day he waited with all the other animals and dolls for somebody to come along and take him home.', 's7.jpg');
INSERT INTO `storylist` VALUES (19, 'The Snowy Day by Ezra Jack Keats', 'One winter morning Peter woke up and looked out the window. Snow had fallen during the night. It covered everything as far as he could see.', 's8.jpg');
INSERT INTO `storylist` VALUES (20, 'The Runaway Bunny by Margaret Wise', 'If you run away, said his mother, I will run after you. For you are my little bunny.', 's9.jpg');

-- ----------------------------
-- Table structure for user_history
-- ----------------------------
DROP TABLE IF EXISTS `user_history`;
CREATE TABLE `user_history`  (
  `upid` int(11) NOT NULL AUTO_INCREMENT,
  `oricontent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '原始内容',
  `oriimage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '原始封面',
  `orititle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '原始标题',
  `usercontent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '用户内容',
  `logtime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '录音时间',
  `logurl` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '账号',
  `contentresult` int(11) NULL DEFAULT NULL COMMENT '结果1正确2错误',
  PRIMARY KEY (`upid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户文章' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_history
-- ----------------------------
INSERT INTO `user_history` VALUES (11, 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami.', 's4.jpg', 'The Very Hungry Caterpillar', 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami.', '06/02/2024,12:00:00', NULL, 'test', 1);
INSERT INTO `user_history` VALUES (12, 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami.', 's4.jpg', 'The Very Hungry Caterpillar', 'On Saturday, he ate through one piece of chocolate cake, one ice-cream cone, one pickle test, one slice of , one slice of salami.', '06/02/2024,12:50:00', NULL, 'test', 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 'test', '2');

SET FOREIGN_KEY_CHECKS = 1;
