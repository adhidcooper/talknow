CREATE TABLE IF NOT EXISTS `channel` (
    `channel_id` varchar(255) PRIMARY KEY,
    `channel_name` varchar(255) NOT NULL,
    `created_time` timestamp,
    `created_by` varchar(255),
    `channel_open` boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS`members` (
    `members_id` Varchar(255) PRIMARY KEY,
    `user_id` varchar(255), `channel_id` varchar(255),
    FOREIGN KEY (channel_id) REFERENCES `channel` (channel_id)
);

CREATE TABLE IF NOT EXISTS `content` (
    `content_id` varchar(255) PRIMARY KEY,
    `channel_id` varchar(255),
    `user_id` varchar(255),
    `message` varchar(255),
    `created_time` timestamp,
    `created_by` varchar(255),
    FOREIGN KEY (channel_id) REFERENCES `channel` (channel_id)
);