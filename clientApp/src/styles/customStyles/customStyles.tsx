import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

const customStyle: SxProps<Theme> = {
    listDivider: {
        width: '100%',
        maxWidth: 'auto',
        bgcolor: 'background.paper',
        item: {
            height: '8em',
        },
    },
    title: {
        fontSize: '2rem',
        marginLeft: '12px',
    },
    button: {
        marginBottom: "15px",
        marginLeft: '12px',
        textTransform: 'none'
    },
    textField: {
        marginLeft: '12em',
        marginBottom: "15px",
    }
} as const

export default customStyle