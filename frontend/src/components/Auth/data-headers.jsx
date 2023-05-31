import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const notification_items = [
    {
        img: "https://phapluatxahoi.kinhtedothi.vn/stores/news_dataimages/2023/032023/09/13/lich-phat-song-phim-luat-su-ly-hon-shin-divorce-attorney-shin_1.jpg?rt=20230309135606",
        icon: <NotificationsIcon sx={{ color: "yellow" }} />,
        note: "Lời nhắc: Nội dung mới",
        name: "Luật sư ly hôn Shin",
        time: "cách đây 1 tháng"
    },
];

export const profile_items = [
    {
        icon: <SupervisorAccountIcon sx={{ fontSize: "1.5rem" }}/>,
        title: "Admin",
        name: "admin",
    },
    {
        icon: <PersonIcon sx={{ fontSize: "1.5rem" }}/>,
        title: "User",
        name: "user",
    },
    {
        icon: <HelpOutlineIcon sx={{ fontSize: "1.5rem" }}/>,
        title: "Help",
        name: "help",
    },
];