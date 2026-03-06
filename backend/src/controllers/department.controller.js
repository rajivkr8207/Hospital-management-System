import DepartmentModel from "../models/department.model.js";

export const createDepartment = async (req, res) => {
  try {
    const { name, department_code, description } = req.body;

    const existing = await DepartmentModel.findOne({
      $or: [{ name }, { department_code }]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Department already exists"
      });
    }

    const department = await DepartmentModel.create({
      name,
      department_code,
      description
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


export const getAllDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


export const getDepartmentById = async (req, res) => {
  try {
    const department = await DepartmentModel.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


export const updateDepartment = async (req, res) => {
  try {
    const { name, department_code, description, is_active } = req.body;

    const department = await DepartmentModel.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    department.name = name ?? department.name;
    department.department_code = department_code ?? department.department_code;
    department.description = description ?? department.description;
    department.is_active = is_active ?? department.is_active;

    await department.save();

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


export const deleteDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found"
      });
    }

    await department.deleteOne();

    res.status(200).json({
      success: true,
      message: "Department deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};