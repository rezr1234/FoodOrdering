import path from 'path';
import multiparty from 'multiparty';
const filePath = path.resolve(__dirname, '../../../../public/uploads');
export const config = {
	api: {
		bodyParser: false,
	},
};

function convertPathToUrl(filePath, req) {
	const protocol = req.headers.referer.split(':')[0];
	const host = req.headers.host;
	const urlPath = filePath.replace(/\\/g, '/');
	const publicPath = urlPath.split('/public')[1];
	const fileUrl = `${protocol}://${host}${publicPath}`;
	return fileUrl;
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const form = new multiparty.Form({ uploadDir: filePath });
		const { fields, files } = await new Promise((resolve, reject) => {
			form.parse(req, function (err, fields, files) {
				if (err) reject(err);
				else {
					files.file[0].url = convertPathToUrl(files.file[0].path, req);
					resolve({ fields, files });
				}
			});
		});
		req.body = fields;
		req.files = files;
		res.status(200).json({ fields, files });
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
