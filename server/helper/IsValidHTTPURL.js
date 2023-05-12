const courseCount = await Course.count({
        where: {
            instructor_id: instructorId,
        },
    }
)