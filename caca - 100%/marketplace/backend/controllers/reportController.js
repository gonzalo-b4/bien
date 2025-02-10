const Report = require('../models/Report');

exports.createReport = async (req, res) => {
    const { description, storeId, productId } = req.body;

    try {
        const report = await Report.create({
            description,
            userId: req.user.id,
            storeId,
            productId,
            status: 'pending'
        });

        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ include: ['User', 'Store', 'Product'] });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.resolveReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ msg: 'Report not found' });
        }

        report.status = 'resolved';
        await report.save();
        res.json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
