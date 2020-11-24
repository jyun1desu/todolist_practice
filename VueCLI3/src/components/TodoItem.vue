<template>
    <form draggable="true" class="tasks">
        <div class="drag_icon"></div> 
        <div class="main_information">
            <i class="fa-check completed_checkbox far"></i>
            <input type="text" placeholder="" readonly="readonly" class="task_title">
            <i class="fa-star star_mark far"></i> <i class="fa-pen edit_icon far"></i>
            <i class="far fa-trash-alt delete_icon"></i>
        </div>
        <div class="quick_detail"></div>
        <div class="detail_area">
            <div class="deadline">
                <i class="icon far fa-calendar-alt"></i>
                <div class="content_block">
                    <p>Deadline</p>
                        <div class="time_block">
                            <input type="date" class="deadline_date">
                            <input type="time" class="deadline_time">
                        </div>
                </div>
            </div>
            <div class="file_update">
                <i class="icon far fa-file"></i>
                <div class="content_block">
                    <p>File</p>
                    <input id="update1" type="file" class="update_button">
                    <label for="update1"></label></div>
                </div>
                <div class="memo">
                    <i class="icon far fa-comment-dots"></i>
                    <div class="content_block">
                        <p>Comment</p>
                        <textarea placeholder="Type your memo here...">1</textarea>
                    </div>
                </div>
        </div>
        <div class="button_area">
            <button type="button" class="cancel_edit_button">× Cancel</button>
            <button type="button" class="save_button">+ Save</button>
        </div>
    </form>
</template>

<script>
export default {
    name:'TodoItem'
}
</script>

<style lang="scss">
.todo_list{
        .tasks {
        @include task_detail;
        background-color: $secondary_background_color;
        border-radius: 5px;
        margin-bottom: 8px;
        user-select: none;
        opacity: 1;
        transition: all 0.5s;
        overflow: hidden;

        &.dragged{
            opacity: 0.3;
            transform: translateY(0);
        }
        &.passedfromtop{
            margin: 0 0 50px;
        }
        &.passedfrombottom{
            margin: 50px 0 8px;
        }

        &.primary {
            background-color: $highlight_color;
        }

        &.noquery {
            .delete_icon {
                transform: scale(1);
                max-width: 20px;
            }

            .quick_detail {
                display: none;
            }

            .detail_area {
                display: block;
            }

            .button_area {
                display: flex;
            }
        }

        &.done .task_title {
            text-decoration: line-through;
        }
    }

    .main_information {
        @include task_overview;
        border-bottom: none;

        .task_title {
            @include input_style;
            margin-right: 10px;
            margin-bottom: 0;
            flex: 0 1 100%;
            font-size: 18px;
            font-weight: bold;
            background-color: transparent;

            &::placeholder {
                font-size: 18px;
                color: $secondary_font_color;
                font-weight: bold;
            }
    
            &.warning::placeholder {
                color: $warning_color;
            }
        }

    }

    .quick_detail {
        padding: 0 0 0 60px;
        display: flex;
        align-items: center;

        @include RWD($pad_horizontal) {
            padding-left: 60px;
        }

        >span {
            display: flex;
            align-items: center;
            font-size: 0;
            margin-bottom: 10px;

            &+span {
                margin-left: 12px;
            }

            >span {
                margin-left: 3px;
            }

            i,
            span {
                font-size: 12px;
                color: $secondary_icon_color;
            }
        }
    }

    .detail_area {
        display: none;
        border-top: 2px solid $secondary_font_color;
    }

    .button_area {
        display: none;
    }
}
</style>