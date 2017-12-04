const {json, send} = require('micro');
module.exports = async (req, res) => {
    // const js = await json(req);
    // console.log(js);
    const payload = {
        text: 'adasd',
        attachments: [
            {
                pretext: 'This is the attachment pretext.',
                text: 'This is the attachment text.',
                actions: [
                    {
                        name: 'Ephemeral Message',
                        id: '1'
                    }, {
                        name: 'Update',
                        id: '2'
                    }
                ]
            }
        ]
    };
    send(res, 200, payload);
};